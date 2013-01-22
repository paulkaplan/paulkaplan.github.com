# https://groups.google.com/forum/?fromgroups=#!topic/jekyll-rb/Z0LZuPxUsy0

module Jekyll 
  module Filters 
    def gallery(output) 
      Dir.glob('img/ARTV22502/8bit/thumbs/*').each_with_index do |i, index| 
      	output << 
      		"
      		#{'<div class=\'row\'>' if((index+3)%3==0 and index!=0)  }
      		<div class=\"fourcol #{'last' if((index+1)%3==0 and index!=0)}\"> 
      			<a href=\"../#{i.gsub(/thumbs\//, '')}\" class=\"gallery\"> 
      				<img src=\"../#{i}\" />
      			</a>
      		</div>
      		      		#{'</div>' if((index+1)%3==0 and index!=0)  }
" 
			end 
      output 
    end 
  end 
end 