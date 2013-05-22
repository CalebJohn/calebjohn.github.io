import time
import random


canvas = doc["myCanvas"]

if hasattr(canvas,'getContext'):
    context = canvas.getContext("2d")
else:
    doc['navig_zone'].html = "On Internet Explorer 9 or more, use a Standard rendering engine"
    
def level1():
    form = []
    for i in range(111, -40, -50):
        for j in range(536, 85, -75):
            form.append([j, i])
    return form
    
def level2():
    form = []
    for i in range(-200, 111, 100):
        for j in range(85, 536, 150):
            form.append([j, i])
    for i in range(-250, 61, 100):
        for j in range(160, 461, 150):
            form.append([j, i])
    return form
def level3():
    form = [[310, 60], [310, -40], [310, -140], [310, -215]]
    for i in range(-190, 111, 100):
        for j in range(160, 461, 150):
            form.append([j, i])
    for i in range(-165, 86, 50):
        for j in range(235, 435, 150):
            form.append([j, i])
    return form
def level4():
    form = [[310, 110], [310, 60]]
    for i in range(85, 536, 75):
        form.append([i, 10])
    for i in range(-140, -39, 100):
        for j in range(160, 461, 150):
            form.append([j, i])
    for i in range(-190, -89, 100):
        for j in range(85, 536, 150):
            form.append([j, i])
    for i in range(160, 461, 75):
        form.append([i, -240])
    return form
def level5():
    form = []
    for i in range(-40, 111, 50):
        for j in range(10, 511, 150):
            form.append([j, i])
    for i in range(-15, 110, 50):
        for j in range(85, 586, 150):
            form.append([j, i])
    return form
    
def move_ship():
    global ship_pos
    if len(key_queue) < 1:
        return
    if key_queue[-1] == 'right' and ship_pos[0] < width - 72:
        ship_pos[0] += ship_vel
    elif key_queue[-1] == 'left' and ship_pos[0] > 8:
        ship_pos[0] -= ship_vel
    
def shoot_laser():
    global laser_pos
    laser_pos[0] = ship_pos[0] + 31
    laser_pos[1] = ship_pos[1]
    
def shoot_alien_laser(ali):
    global alien_lasers
    if len(alien_lasers) >= 10: return
    alien_lasers.append([ali[0] + 31, ali[1]])
    
def move_laser():
    global laser_pos
    laser_pos[1] -= 12
def move_alien_laser():
    global alien_lasers
    for las in alien_lasers:
        las[1] += 10
        
def GameOver():
    global dead, alien_list, alien_lasers, barrier_list, level_index
    dead = True
    alien_list = []
    alien_lasers = []
    barrier_list = []
    for i in range(1000):
        move_laser()
    level_index = 5
    context.drawImage(gameover, 0, 0)
    
        
def collide_alien_laser():
    for las in alien_lasers:
        if las[0] > ship_pos[0] and las[0] < ship_pos[0] + 65:
            if las[1] + 8 > ship_pos[1] and las[1] < ship_pos[1] + 42:
                GameOver()
        if las[1] > canvas.height:
            alien_lasers.remove(las)
    for las in alien_lasers:
        for bar in barrier_list:
            if las[0] > bar[0] and las[0] < bar[0] + 25:
                if las[1] + 8 > bar[1]  and las[1] < bar[1] + 13:
                    barrier_list.remove(bar)
                    las[1] += 1000
                    return
    
def collide_laser():
    global menu, playing_levels
    if menu:
        if laser_pos[1] < 380:
            if 283 < laser_pos[0] and laser_pos[0] < 417:
                menu = False
                playing_levels = True
                for i in range(1000):
                    move_laser()
        return
                
    for ali in alien_list:
        if laser_pos[0] > ali[0] and laser_pos[0] < ali[0] + 65:
            if laser_pos[1] - 8 < ali[1] and laser_pos[1] > ali[1] - 42:
                alien_list.remove(ali)
                for i in range(1000):
                    move_laser()
                return
    for bar in barrier_list:
        if laser_pos[0] > bar[0] and laser_pos[0] < bar[0] + 25:
            if laser_pos[1] - 8 < bar[1] and laser_pos[1] > bar[1] - 13:
                barrier_list.remove(bar)
                for i in range(1000):
                    move_laser()
                return
    
def aliens_move():
    global alien_list, alien_step
    for ali in alien_list:
        if random.random() < 0.0009:
            shoot_alien_laser(ali)
        ali[0] += alien_step
        if ali[0] <= 3:
            alien_step *= -1
            for al in alien_list:
                al[1] += 5
        if ali[0] + 65 >= width:
            alien_step *= -1
            for al in alien_list:
                al[1] += 5
        
    
def keydown(e):
    global key_queue
    if dead: return
    if e.keyCode == 37 and 'left' not in key_queue:
        key_queue.append('left')
    elif e.keyCode == 32:
        if laser_pos[1] < 0:
            shoot_laser()
    elif e.keyCode == 39 and 'right' not in key_queue:
        key_queue.append('right')
    elif e.keyCode == 80:
        pass
    
def keyup(e):
    global key_queue
    if e.keyCode == 37:
        key_queue.remove('left')
    elif e.keyCode == 39:
        key_queue.remove('right')
        
def draw():
    context.drawImage(back, 0, 0)
    if menu: context.drawImage(title, 0, 0)
    context.drawImage(laser, laser_pos[0], laser_pos[1])
    if not dead: context.drawImage(ship, ship_pos[0], ship_pos[1])
    if dead: context.drawImage(gameover, 0, 0)
    if not menu:
        for las in alien_lasers:
            context.drawImage(alaser, las[0], las[1])
        for ali in alien_list:
            context.drawImage(alien, ali[0], ali[1])
        for bar in barrier_list:
            context.drawImage(quilt, bar[0], bar[1])
    
def update():
    global alien_list
    draw()
    move_ship()
    move_laser()
    move_alien_laser()
    collide_laser()
    collide_alien_laser()
    if not menu: aliens_move()
    if playing_levels and not dead:
        if level_index < 4 and len(alien_list) == 0:
            level_index += 1
            alien_list = levels[level_index]()
    
title = IMG('', src="Sprites/title.png")
back = IMG('', src="Sprites/stars.png")
ship = IMG('', src="Sprites/pie_ship.png")
laser = IMG('', src="Sprites/laser.png")
alien = IMG('', src="Sprites/alien_ship.png")
alaser = IMG('', src="Sprites/alaser.png")
quilt = IMG('', src="Sprites/quilt.png")
gameover = IMG('', src="Sprites/gameover.png")
doc.onkeydown = keydown
doc.onkeyup = keyup
alien_step = 3
ship_vel = 8
key_queue = []

dead = False

playing_levels = False

menu = True

height = canvas.height
width = canvas.width
ship_pos = [5, height - 50]
laser_pos = [-10, -10]

level_index = 0
levels = [level1, level2, level3, level4, level5]
alien_list = levels[level_index]()
alien_lasers = []
barrier_list = [[318, 428], [342, 428], [366, 428], [318, 420], [342, 420], [366, 420], [318, 412], [342, 412], [366, 412], [85, 428], [109, 428], [133, 428], [85, 420], [109, 420], [133, 420], [85, 412], [109, 412], [133, 412], [551, 428], [575, 428], [599, 428], [551, 420], [575, 420], [599, 420], [551, 412], [575, 412], [599, 412]]

draw()

time.set_interval(update, 30)
