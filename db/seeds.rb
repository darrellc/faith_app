# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#Create the song keys from scratch
SongKey.delete_all
["Ab","A","A#","Bb","B","C","C#","Db","D","D#","Eb","E","F","F#","Gb","G","G#"].each do |k|
  SongKey.create! :value => k
end
#Create Song key types
SongKeyType.delete_all
["Major", "Minor"].each do |t|
  SongKeyType.create! :value => t
end

#Create song timings
SongTiming.delete_all
["2/2","2/4","3/4","4/4","5/4","6/4","3/8","6/8","7/8","9/8","12/8"].each do |st|
  SongTiming.find_or_create_by_name(st)
end

#Create SongTagGroups
SongTagGroup.delete_all
["Type","Style","Speed"].each do |stg|
  SongTagGroup.find_or_create_by_name(stg)
end

#Create Song Tags
SongTag.delete_all
#Create type
stg = SongTagGroup.find(1)
["Hymn","Chorus","Intrumental","Special"].each do |st|
  SongTag.create! :name => st, :song_tag_group_id => stg.id
end
#Create style
stg = SongTagGroup.find(2)
["Traditional","Contemporary"].each do |st|
  SongTag.create! :name => st, :song_tag_group_id => stg.id
end

#Create Speed
stg = SongTagGroup.find(3)
["Slow","Medium","Fast"].each do |st|
  SongTag.create! :name => st, :song_tag_group_id => stg.id
end



