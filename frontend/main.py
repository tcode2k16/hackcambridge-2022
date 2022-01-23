import json
import html

with open('./esg-ratings') as f:
    data = f.read()

lines = data.split('\n')
lines = [e for e in lines if e != '']
# print(lines)
i = 0
    
d = {}
while True:
    for _ in range(2):
        i += 1
    name = html.unescape(lines[i].strip().split('">')[-1].split('</a>')[0])
    # print(name)
    i += 1
    marker = html.unescape(lines[i].strip()[7:-8])
    i += 1
    for _ in range(3):
        i += 1
    # print(lines[i].strip())
    rating = (float(lines[i].strip()[len('<div class="col-2">'):-len('</div>')]))
    i += 1
    for _ in range(9):
        i += 1    
    grade = html.unescape(lines[i].strip()[len('<div class="col-lg-6 col-md-10">'):-len('</div>')])
    i += 1
    for _ in range(3):
        i += 1    

    # print(json.dumps({
    #     'name': name,
    #     'makrer': marker,
    #     'rating': rating,
    #     'grade': grade,
    # }, ensure_ascii=False)+',')

    d[name] = {
        'makrer': marker,
        'rating': rating,
        'grade': grade,
    }

    if 'Zynga' in name:
        break

print(json.dumps(d, ensure_ascii=False))