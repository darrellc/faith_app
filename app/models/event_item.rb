class EventItem < ActiveRecord::Base
  belongs_to :event
  belongs_to :song
  belongs_to :member_group
  
  
  #
  # item - {:id, :name, :duration, :song_id, :member_group_id, :description}
  # unique - Whether the id needs to be generated or not.
  def generateEventItemInfo item, unique=false    
    #print out the item (should be a hash)
    if unique
      id = Array.new(8){[*'0'..'9', *'a'..'z', *'A'..'Z'].sample}.join.to_s
    else
      id = item[:id]
    end
    item[:id] = "data-id='"+id.to_s+"'"
    html = "<div class='clearfix bg-ow bdb-g bdc-ccc ev cur-p event-item' #{item[:id]}>"
    html += "<div class='w-60p bdr-g bdl-g bdc-ccc p-10 fl-l'>#{item[:name]}</div>"
    html += "<div class='w-30p bdr-g bdc-ccc p-10 fl-l'>#{item[:duration]}</div>"
    html += "<div class='w-10p bdr-g bdc-ccc fl-l'><a href='#' class='c-dr fs-n ev fl-r delete-item-btn' data-type='Event Item' data-name='#{item[:name]}'><i class='fa fa-trash-o'></i></a></div>"
    if unique
      item.each do |key,value|
        if key == :id then
          next
        end
        html += "<input type='hidden' name='items[item#{id}[#{key}]]' value='#{value}' />"
      end      
    end
    html += "</div>"
    return html.html_safe     
  end  
end
