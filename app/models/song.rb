class Song < ActiveRecord::Base
  belongs_to :song_type
  belongs_to :song_timing
  belongs_to :song_speed 
  
  has_and_belongs_to_many :song_contributors
  has_and_belongs_to_many :song_themes
  has_and_belongs_to_many :song_tags
  
  has_many :files
  has_many :song_adaptations
end
