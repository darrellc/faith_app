class MemberGroup < ActiveRecord::Base
  belongs_to :organization
  has_and_belongs_to_many :members
end
