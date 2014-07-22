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
  
  # var newRow = "<tr data-id='<%= e.id %>' data-type='events'>";
      # newRow += "<td><%= e.name %></td>";
      # newRow += "<td><%= e.timeFormat e.start_time %></td>";
      # newRow += "<td>";
        # newRow += "<a href='#' class='c-dr fs-lg ph-15 ev fl-r delete delete-btn' data-url='/events/<%= e.id %>' data-type='Event' data-name='<%= e.name %>'>";
          # newRow += "<i class='fa fa-times'></i>";
        # newRow += "</a>";
      # newRow += "</td>";
    # newRow += "</tr>";
  
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
  
  def generateEventItems items=nil
    #If the model passed in is an Event Item then we want to create a hash with the values
    puts items
    eventItems = nil
    if items.nil?      
      eventItems = self.event_items
    else
      eventItems = items
    end    
    html = "" 
    eventItems.each do |ei|
      html += "<div class='clearfix bg-ow bdb-g bdc-ccc ev cur-p event-item' data-id='#{ei.id}'>"
      html +=   "<div class='w-60p bdr-g bdl-g bdc-ccc p-10 fl-l'>#{ei.name}</div>"
      html +=   "<div class='w-30p bdr-g bdc-ccc p-10 fl-l'>#{ei.duration}</div>"
      html +=   "<div class='w-10p bdr-g bdc-ccc fl-l'><a href='#' class='c-dr fs-n ev fl-r delete delete-item-btn' data-type='Event Item' data-name='#{ei.name}'><i class='fa fa-trash-o'></i></a></div>"
      html += "</div>"
    end     
    
    return html.html_safe    
  end
  
end
