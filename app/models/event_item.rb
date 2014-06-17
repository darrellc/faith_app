class EventItem < ActiveRecord::Base
  belongs_to :event
  belongs_to :song
  belongs_to :member_group
end
