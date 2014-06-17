class Song < ActiveRecord::Base
  belongs_to :song_type
  belongs_to :song_timing
  belongs_to :song_style
  belongs_to :song_speed
  belongs_to :song_key, foreign_key: "starting_key_id"
  belongs_to :song_key_type, foreign_key: "starting_key_type"
  belongs_to :song_key, foreign_key: "ending_key_id"
  belongs_to :song_key_type, foreign_key: "ending_key_type"
  
  has_and_belongs_to_many :song_contributors
  has_and_belongs_to_many :song_themes
  has_and_belongs_to_many :song_tags
  
  has_many :files
end
