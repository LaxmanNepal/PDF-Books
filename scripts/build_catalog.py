import json, os, urllib.request

owner=os.environ.get('GITHUB_REPOSITORY','LaxmanNepal/PDF-Books').split('/')[0]
repo=os.environ.get('GITHUB_REPOSITORY','LaxmanNepal/PDF-Books').split('/')[1]
token=os.environ.get('GITHUB_TOKEN','')
url=f'https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1'
req=urllib.request.Request(url,headers={'Accept':'application/vnd.github+json','Authorization':f'Bearer {token}'})
with urllib.request.urlopen(req) as r:data=json.load(r)
books=[]
for x in data.get('tree',[]):
    path=x.get('path','')
    if not path.lower().endswith('.pdf'): continue
    parts=path.split('/')
    category=' / '.join(parts[:-1]) if len(parts)>1 else 'Books'
    title=os.path.splitext(parts[-1])[0].replace('_',' ').replace('-',' ').strip()
    books.append({'title':title,'category':category,'url':path,'size':'PDF'})
books.sort(key=lambda b:(b['category'].lower(),b['title'].lower()))
with open('books.json','w',encoding='utf-8') as f:json.dump(books,f,ensure_ascii=False,indent=2)
print(f'Generated catalog with {len(books)} books')
