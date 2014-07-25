class SongTagGroup < ActiveRecord::Base  
  has_many :song_tags
end
