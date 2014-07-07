class Event < ActiveRecord::Base
  belongs_to :organization
  belongs_to :user
  belongs_to :member_group
  has_many :items
  
  has_many :variances, class_name: "Event", foreign_key: "template_id"
  belongs_to :template, class_name: "Event"
end
