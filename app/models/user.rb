class User < ActiveRecord::Base
  belongs_to :organization
  belongs_to :member
  
  has_many :created_users, class_name: "User", foreign_key: "creator_id"
  has_one :creator, class_name: "User", foreign_key: "creator_id"
  
  
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
         
  #Get the full name of the User
  def fullName 
    puts self.first_name    
    return self.first_name + " " + self.last_name    
  end
  
  #Get the Role Name
  def roleName
    case role
    when 1
      return "Admin"
    when 2
      return "Editor"
    when 3 
      return "Viewer"
    end
  end
  
  def timeFormat time
    return time.strftime "%m/%d/%y %l:%M %P"
  end
  
end
