def level1():
    form = []
    for i in range(-40, 111, 50):
        for j in range(85, 536, 75):
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