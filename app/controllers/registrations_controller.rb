class RegistrationsController < Devise::RegistrationsController   
   
  def create
    #Create a new organization
    org = nil
    
    #If the user is registering from the home page then we create a new organization
    if params[:form_type] == "new_registration"
      org = Organization.new :name => params[:group_name]
      role = 1          
    else
      org = current_user.organization
      role = params[:user["role"] ]
      
      params[:user].merge(:password => Devise.friendly_token.first(12))       
      
      #RegistrationMailer.welcome(user, generated_password).deliver
    end
    
    Rails.logger.debug "PARAMS: "+params.to_s
    
    build_resource(sign_up_params)
    
    #Set the Organization of the User    
    resource.organization = org
    #resource.first_name = params[:user["first_name"] ]
    #resource.last_name = params[:user["last_name"] ]
    

    
    #Set the creator if someone is already signed in
    if user_signed_in?
      resource.creator = current_user
    end
    #Set the role of the User
    resource.role = role
    
    Rails.logger.debug resource.inspect
    
    if resource.save    
      org.save
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        respond_to do |format|
          format.html {redirect_to Rails.root }
          format.json {render :json => {:success => true} }     
        end        
        
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        respond_to do |format|
          format.html {redirect_to Rails.root}
          format.json {render :json => {:success => true} }      
        end
      end
    else      
      flash[:error] = resource.errors.full_messages.to_sentence   
      clean_up_passwords resource
      respond_to do |format|
        format.html { render :new }
        format.json { render :json => {:success => false} }     
      end
    end
  end
  

end
