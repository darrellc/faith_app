class Event < ActiveRecord::Base
  belongs_to :organization
  belongs_to :user
  belongs_to :member_group
  has_many :items
end
