class RegistrationsController < Devise::RegistrationsController   
   
  def create
    #Create a new organization
    org = nil
    
    if params[:form_type] == "new_registration"
      org = Organization.create :name => params[:group_name]
      role = 1          
    else
      org = current_user.organization
      role = params[:user[:role] ]
    end
    
    build_resource(sign_up_params)

    #Set the Organization of the User    
    resource.organization = org
    resource.first_name = params[:user[:first_name] ]
    resource.last_name = params[:user[:last_name] ]
    #Set the creator if someone is already signed in
    if user_signed_in?
      resource.creator = current_user
    end
    #Set the role of the User
    resource.role = role
    
    
    if resource.save
      yield resource if block_given?
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      respond_with resource
    end
  end
  

end
