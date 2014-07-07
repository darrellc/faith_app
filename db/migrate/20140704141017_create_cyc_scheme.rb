class CreateCycScheme < ActiveRecord::Migration
  def change
    
    #Create the User model
    create_table :users do |t|
        t.belongs_to :organization
        t.belongs_to :member
        t.references :creator
        
        ## Database authenticatable
        t.string :email,              null: false, default: ""
        t.string :encrypted_password, null: false, default: ""

        ## Recoverable
        t.string   :reset_password_token
        t.datetime :reset_password_sent_at

        ## Rememberable
        t.datetime :remember_created_at

        ## Trackable
        t.integer  :sign_in_count, default: 0, null: false
        t.datetime :current_sign_in_at
        t.datetime :last_sign_in_at
        t.string   :current_sign_in_ip
        t.string   :last_sign_in_ip 
        
        
        t.string :first_name
        t.string :last_name   
        
        t.integer :role       
        

        ## Confirmable
        t.string   :confirmation_token
        t.datetime :confirmed_at
        t.datetime :confirmation_sent_at
        t.string   :unconfirmed_email # Only if using reconfirmable

        ## Lockable
        # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
        # t.string   :unlock_token # Only if unlock strategy is :email or :both
        # t.datetime :locked_at


        t.timestamps
    end
    
    #Create the Organization model
    create_table :organizations do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :city
      t.string :state
      t.string :zip

      t.timestamps
    end
    
    #Create the Event model
    create_table :events do |t|
      t.belongs_to :user
      t.belongs_to :organization
      t.belongs_to :member_group
      t.references :template
      
      t.string :name
      t.text   :description
      t.datetime :start_time
      t.datetime :end_time
      t.string :location

      t.timestamps
    end
    
    #Create the EventItem model
    create_table :event_items do |t|
      t.belongs_to :event
      t.belongs_to :song
      t.belongs_to :member_group
      
      t.string :name
      t.text   :description
      t.string :duration

      t.timestamps
    end
    
    #Create Member model
    create_table :members do |t|
      t.belongs_to :organization
      
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :suffix
      t.string :relationship_status
      t.string :email
      t.string :gender
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :phone
      t.string :mobile
      t.string :business_phone
      t.date   :birthday
      t.date   :join_date
      t.date   :saved_date
      t.date   :baptized_date
      t.string :occupation
      t.string :employer
      t.string :additional_address_info

      t.timestamps
    end
    
    #Create the families model
    create_table :families do |t|
      t.string :name     
      t.timestamps
    end
    
    #Create association table between Members and Families
    create_table :families_members, id: false do |t|
      t.belongs_to :member
      t.belongs_to :family  
    end
    
    #Create MemberGroup model
    create_table :member_groups do |t|
      t.belongs_to :organization
      
      t.string :name

      t.timestamps
    end
    
    #Create association table between Members and MemberGroups
    create_table :member_group_members, id: false do |t|
      t.belongs_to :member_group
      t.belongs_to :member
    end
    
    #Create Song model
    create_table :songs do |t|
      t.belongs_to :song_type
      t.belongs_to :song_timing
      t.belongs_to :song_style
      t.belongs_to :song_speed
      t.belongs_to :song_key, foreign_key: "starting_key"
      t.belongs_to :song_key_type, foreign_key: "starting_key_type"
      t.belongs_to :song_key, foreign_key: "ending_key"
      t.belongs_to :song_key, foreign_key: "starting_key_type"
      
      
      t.string :name
      t.string :length

      t.timestamps
    end
    
    #Create SongType model
    create_table :song_types do |t|
      t.string :value
      t.timestamps
    end
    
    #Create SongTiming model
    create_table :song_timings do |t|
            
      t.string :value
      t.timestamps
    end
    
    #Create SongStyle model
    create_table :song_styles do |t|
      
      t.string :value
      t.timestamps
    end
    
    #Create SongSpeed model
    create_table :song_speeds do |t|
      t.string :value
      t.timestamps
    end
    
    #Create SongKey model
    create_table :song_keys do |t|
      
      t.string :value
      t.timestamps
    end
    
    #Create SongKeyType model
    create_table :song_key_type do |t|
      t.string :value
      t.timestamps
    end
    
    #Create SongThemes model
    create_table :song_themes do |t|
      
      t.string :value
      t.timestamps
    end
    
    #Create the association table between SongThemes and Songs
    create_table :song_themes_songs, id: false do |t|
      t.belongs_to :song_theme
      t.belongs_to :song
    end
    
    #Create SongTags model
    create_table :song_tags do |t|
      t.string :value
      t.timestamps
    end
    
    #Create the association table between SongTags and Songs
    create_table :song_tags_songs, id: false do |t|
      t.belongs_to :song_tag
      t.belongs_to :song
    end
    
    #Create SongContributor model
    create_table :song_contributors do |t|
      t.string :name
      t.string :birthdate
      t.string :deathdate
      
      t.timestamps
    end
    
    #Create the association table between SongContributors and Songs
    create_table :song_contributors_songs, id: false do |t|
      t.belongs_to :song_contributor
      t.belongs_to :song
    end
    
    #Create File model
    create_table :files do |t|
      t.belongs_to :song
      
      t.string :name
      t.string :location
      
      t.timestamps
    end
    
  end
end
