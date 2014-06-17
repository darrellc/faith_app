class Organization < ActiveRecord::Base
  has_many :members
  has_many :events
  has_many :users
  has_many :songs
  has_many :prospects
  has_many :designs
  has_many :social_accounts
  has_many :financial_accounts
  has_many :work_requests
  has_many :member_groups
end
