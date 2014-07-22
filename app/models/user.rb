class User < ActiveRecord::Base
  belongs_to :organization
  belongs_to :member
  
  has_many :created_users, class_name: "User", foreign_key: "creator_id"
  belongs_to :creator, class_name: "User"
  
  
  
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
    if !time.nil?
      return time.strftime "%m/%d/%y %l:%M %P"
    else
      return "N/A"
    end
  end  
  #This will be used in the application to show a row of information for the given model.
  #cu - Current logged in user
  def generateAddHtml disabled=""
    html =  "<tr data-id=#{self.id} data-type=user>"
    html +=  "<td data-name='name'>#{self.fullName}</td>"    
    html +=  "<td width=50>"
    html +=     "<a href=# class='#{disabled} c-dr fs-lg ph-15 ev fl-r delete delete-btn' data-url=/user/#{self.id} data-type=User data-name=#{self.fullName}><i class='fa fa-trash-o'></i></a>"
    html +=  "</td>"
    html += "</tr>"
    return html.html_safe        
  end
  
end
