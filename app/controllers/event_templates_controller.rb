class EventTemplatesController < ApplicationController
  before_filter :set_view_path, :print_action
  #load_and_authorize_resource
  
  def create
    event_items = params[:items]
    event_template = params[:event]
    if can? :create, :event
      e = Event.new
      e = Event.create name: event_template["name"], description: event_template["description"]
      e.organization = current_user.organization
      e.user = current_user
      e.isTemplate = true
      
      event_items.each do |key, value|
        i = EventItem.create value
        i.event = e
        i.save
      end
      
      if e.save
        respond_to do |format|
          format.html {redirect_to root_path}
          format.js { render :template => @view_path + "js/create.js.erb", :locals => {:e => e, :success => true, :msg => "The event template was successfully added." } }
        end
      else
        respond_to do |format|
          format.html {redirect_to root_path}
          format.js { render :template => @view_path + "js/create.js.erb", :locals => {:success => false, :msg => "The event template could not be added.", :reasons => e.errors.full_messages.to_sentence } }
        end
      end
    end
  end
  
  def set_view_path
    @view_path = "account/events/templates/"
  end
  
  def print_action
    puts "<<<<<<<<<<<<<<<<<<<<#{controller_name}-#{action_name}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  end
  
end 