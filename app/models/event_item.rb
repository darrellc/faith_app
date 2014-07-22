class EventItem < ActiveRecord::Base
  belongs_to :event
  belongs_to :song
  belongs_to :member_group
  
  
  def generateEventItemInfo item
     item[:id] ||= "data-id='"+Array.new(8){[*'0'..'9', *'a'..'z', *'A'..'Z'].sample}.join.to_s+"'"
     html = "<div class='clearfix bg-ow bdb-g bdc-ccc ev cur-p event-item' #{item[:id]}>"
     html += "<div class='w-60p bdr-g bdl-g bdc-ccc p-10 fl-l'>#{item[:name]}</div>"
     html += "<div class='w-30p bdr-g bdc-ccc p-10 fl-l'>#{item[:duration]}</div>"
     html += "<div class='w-10p bdr-g bdc-ccc fl-l'><a href='#' class='c-dr fs-n ev fl-r delete-item-btn' data-type='Event Item' data-name='#{item[:name]}'><i class='fa fa-trash-o'></i></a></div>"
     if item[:container].include? "#itemShowBox"
       html += "<input type='hidden' name='items[item#{item[:count]}[name]]' value='#{item[:name]}' />"
       html += "<input type='hidden' name='items[item#{item[:count]}[duration]]' value='#{item[:duration]}' />"
     end
     return html.html_safe     
  end  
end
