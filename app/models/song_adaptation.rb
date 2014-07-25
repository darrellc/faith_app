class SongAdaptation < ActiveRecord::Base
  
  belongs_to :song_key, foreign_key: "starting_key"
  belongs_to :song_key_type, foreign_key: "starting_key_type"
  belongs_to :song_key, foreign_key: "ending_key"
  belongs_to :song_key_type, foreign_key: "ending_key_type"
  belongs_to :song_timing
  
  has_and_belongs_to_many :song_orders  
end
