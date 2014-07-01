class RegistrationsController < Devise::RegistrationsController   
  def create
    puts "RegistrationsController#create"
    #Create the user object
    userParams = params[:user]
    u = User.new :first_name => userParams[:first_name], :last_name => userParams[:last_name], :email => userParams[:email]
    org = nil
    #The user is registering a church for the first time.
    if params[:form_type] == "new_registration"
      puts "NEW USER REGISTRATION"
      u.password = userParams[:password]
      u.role = 1
      org = Organization.new :name => params[:group_name]      
      u.organization = org
    elsif user_signed_in?
      puts "USER IS BEING ADDED BY ANOTHER USER"
      pass = Devise.friendly_token.first(12) 
      puts "PASS: " + pass
      u.password = pass      
      u.role = userParams[:role]
      u.organization = current_user.organization
      u.creator = current_user
    else
      unauthorized!
    end
    
    
    #Save the User
    if u.save
      #Only save the organization if the user is being registered for the first time
      #Sign in the newly registrated user
      if params[:form_type] == "new_registration"
        org.save
        sign_up(resource_name, resource)
      end
      #Redirect to the home page if the user is being created for the first time             
      respond_to do |format|
        format.html {redirect_to root_path }
        format.js {render :template => "account/user/js/create.js.erb", :locals => {:success => true, :msg => "The user was successfully added.", :u => u} }     
      end     
    else
      #Inform the user of the errors
      flash[:error] = u.errors.full_messages.to_sentence   
      clean_up_passwords u      
      respond_to do |format|
        #Return to the new action of the Registrations controller
        format.html { render :new }
        #Show the user the alert that the user has not been created.
        format.js {render :template => "account/user/js/create.js.erb", :locals => {:success => false, :msg => "The user was not added.", :reasons => u.errors.full_messages.to_sentence} }     
      end
    end
  end

end
