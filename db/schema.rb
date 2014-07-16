# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140704141017) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_items", force: true do |t|
    t.integer  "event_id"
    t.integer  "song_id"
    t.integer  "member_group_id"
    t.string   "name"
    t.text     "description"
    t.string   "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.integer  "user_id"
    t.integer  "organization_id"
    t.integer  "member_group_id"
    t.integer  "template_id"
    t.string   "name"
    t.text     "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string   "location"
    t.boolean  "isTemplate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "families", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "families_members", id: false, force: true do |t|
    t.integer "member_id"
    t.integer "family_id"
  end

  create_table "files", force: true do |t|
    t.integer  "song_id"
    t.string   "name"
    t.string   "location"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "member_group_members", id: false, force: true do |t|
    t.integer "member_group_id"
    t.integer "member_id"
  end

  create_table "member_groups", force: true do |t|
    t.integer  "organization_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "members", force: true do |t|
    t.integer  "organization_id"
    t.string   "first_name",              null: false
    t.string   "last_name",               null: false
    t.string   "suffix"
    t.string   "relationship_status"
    t.string   "email"
    t.string   "gender"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "phone"
    t.string   "mobile"
    t.string   "business_phone"
    t.date     "birthday"
    t.date     "join_date"
    t.date     "saved_date"
    t.date     "baptized_date"
    t.string   "occupation"
    t.string   "employer"
    t.string   "additional_address_info"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organizations", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "phone"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_contributors", force: true do |t|
    t.string   "name"
    t.string   "birthdate"
    t.string   "deathdate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_contributors_songs", id: false, force: true do |t|
    t.integer "song_contributor_id"
    t.integer "song_id"
  end

  create_table "song_key_type", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_keys", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_speeds", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_styles", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_tags", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_tags_songs", id: false, force: true do |t|
    t.integer "song_tag_id"
    t.integer "song_id"
  end

  create_table "song_themes", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_themes_songs", id: false, force: true do |t|
    t.integer "song_theme_id"
    t.integer "song_id"
  end

  create_table "song_timings", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "song_types", force: true do |t|
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "songs", force: true do |t|
    t.integer  "song_type_id"
    t.integer  "song_timing_id"
    t.integer  "song_style_id"
    t.integer  "song_speed_id"
    t.integer  "song_key_id"
    t.integer  "song_key_type_id"
    t.string   "name"
    t.string   "length"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.integer  "organization_id"
    t.integer  "member_id"
    t.integer  "creator_id"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "role"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
