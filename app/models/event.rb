class Event < ActiveRecord::Base
  belongs_to :organization
  belongs_to :user
  belongs_to :member_group
  has_many :event_items
  
  has_many :variances, class_name: "Event", foreign_key: "template_id"
  belongs_to :template, class_name: "Event"
  
  def timeFormat time
    if !time.nil?
      return time.strftime "%m/%d/%y %l:%M %P"
    else
      return "N/A"
    end
  end
  
  def generateEventInfo opts={}
    o = {:disabled => "", :template => false}.merge(opts)
    puts "TEMPLATE = "+o[:template].to_s
    html = "<tr data-id='#{self.id}' data-type='events'>"
    html +=  "<td>#{self.name}</td>"
    if !o[:template]
      html += "<td>#{self.timeFormat self.start_time}</td>"
    end
    html +=  "<td>"
    html +=    "<a href='#' class='c-dr fs-lg ph-15 ev fl-r delete delete-btn #{o[:disabled]}' data-url='/events/#{self.id}' data-type='Event' data-name='#{self.name}'>"
    html +=      "<i class='fa fa-trash-o'></i>"
    html +=    "</a>"
    html +=  "</td>"
    html += "</tr>"    
    return html.html_safe
  end
  
  
   # item - {:id, :name, :duration, :song_id, :member_group_id, :description}
  def generateEventItems unique=false
    #If the model passed in is an Event Item then we want to create a hash with the values
    html = ""
    self.event_items.each do |ei|
      html += ei.generateEventItemInfo({
                                         :id => ei.id, 
                                         :name => ei.name, 
                                         :duration => ei.duration, 
                                         :description => ei.description, 
                                         :song_id => ei.song, 
                                         :member_group_id => ei.member_group
                                       }, unique)
    end           
    return html.html_safe    
  end  
end
