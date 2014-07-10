class EventsController < ApplicationController 
  before_filter :set_view_path
  load_and_authorize_resource
  
  def create
    ep = event_params
    puts ep[:start_time].to_i
    start = Date.new ep[:start_time].to_time.to_i
    e = Event.create name: ep[:name], start_time: start, description: ep[:description]
    e.organization = current_user.organization
    e.user = current_user
     
    if e.save
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js { render :template => @view_path + "js/create.js.erb", :locals => {:e => e, :success => true, :msg => "The event was successfully created." } }
      end
    else
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js { render :template => @view_path + "js/create.js.erb", :locals => {:success => false, :msg => "The event could not be created.", :reasons => e.errors.full_messages.to_sentence } }
      end
    end 
  end
  
  def update
    
  end
  
  def destroy
    
  end
  
  def show
    
  end
  
  def index
    
  end
  
  def set_view_path
    @view_path = "account/events/"
  end  
  
  def event_params
    params.require(:event).permit(:name, :description, :start_time)
  end
  
end
