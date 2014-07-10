class Event < ActiveRecord::Base
  belongs_to :organization
  belongs_to :user
  belongs_to :member_group
  has_many :items
  
  has_many :variances, class_name: "Event", foreign_key: "template_id"
  belongs_to :template, class_name: "Event"
  
  def timeFormat time
    if !time.nil?
      return time.strftime "%m/%d/%y %l:%M %P"
    else
      return "N/A"
    end
  end
  
end
