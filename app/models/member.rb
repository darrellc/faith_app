class Member < ActiveRecord::Base
  belongs_to :organization
  has_and_belongs_to_many :members
  has_one :user
  has_and_belongs_to_many :families
end
