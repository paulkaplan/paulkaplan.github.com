---
title : Jekyll Templating for HeadJS
layout: default
---
A snippet I found useful for building sites using Jekyll and HeadJS. On many pages I want some custom javascript to be loaded, but most of the javascript on my sites is loaded asynchronously by HeadJS. Of course I would prefer to have all that in my default template instead of writing it out differently for ever page. So in the YAML at the top of each Jekyll post I put

    {% highlight yaml %}{% raw %}
    ---
    title : new post
    ... 
    javascripts : 
      -
        name : 'name your custom javascript'
        location : '/path/to/js/file'
      - 
        name : 'another custom javascript'
        location : '/path/to/other/js'
      ...
    ---
    {% endraw %}{% endhighlight %}
And in my default template I have 

    {% highlight js%}{% raw %}
      head.js(
        { jquery  :   '/js/jquery.js' }, // for example
        // Now just repeat that in template form
        {% for js in page.javascripts %}
          ,{ {{js.name}} : '{{ js.location }}' }
        {% endfor %}
        
      );{%endraw%}{% endhighlight %}
      
And all my custom js files are loaded with each page! 