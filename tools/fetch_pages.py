import urllib.request
pages=['pages/gallery.html','pages/weddings.html','pages/corporate.html','pages/documentary.html']
for p in pages:
    url='http://localhost:8000/'+p
    try:
        r=urllib.request.urlopen(url, timeout=5)
        data=r.read().decode('utf-8')
        print(p,'->',r.getcode(), 'img tags:', data.count('<img'))
    except Exception as e:
        print('ERROR',p,e)
