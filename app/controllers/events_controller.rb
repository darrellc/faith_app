class EventsController < ApplicationController 
  before_filter :set_view_path, :print_action
  load_and_authorize_resource
  
  def create    
    ep = event_params
    event_items = params[:items]
    st = params[:sDate] + " " + params[:sTime] + " " + params[:sMeridian]
    puts st    
    start = DateTime.strptime(st, "%m-%d-%Y %I:%M %p").to_time
    e = Event.new
    e = Event.create name: ep[:name], start_time: start, description: ep[:description], isTemplate: false
    e.organization = current_user.organization
    e.user = current_user
    
    if !event_items.nil?
      event_items.each do |key, value|
        i = EventItem.create value
        i.event = e
        i.save
      end
    end
    
    if e.save
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js { render :template => @view_path + "js/create.js.erb", :locals => {:e => e, :success => true, :msg => "The event was successfully added." } }
      end
    else
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js { render :template => @view_path + "js/create.js.erb", :locals => {:success => false, :msg => "The event could not be added.", :reasons => e.errors.full_messages.to_sentence } }
      end
    end 
  end
  
  def update
    
  end
  
  def destroy
    begin
      @event.destroy
      respond_to do |format|
        format.js {render :template => @view_path + "js/destroy.js.erb", :locals => {:success => true, :e => @event} }
        format.html {render root_path}
      end      
    rescue
      respond_to do |format|
        format.js {render :template => @view_path + "js/destroy.js.erb", :locals => {:success => false} }
      end
    end
  end
  
  def show
    respond_to do |format|
      format.js { render :template => @view_path + "js/show.js.erb", :locals => {:e => @event} }
    end
  end
  
  def index
    
  end
  
  def add
    #Find the event
    e = Event.find(params[:template_id])
    respond_to do |format|
      format.js{ render :template => @view_path + "js/add.js.erb", :locals => {:e => e, :msg => "Template #{e.name} has been added to your current event."} }
    end
    
  end
  
  def set_view_path
    @view_path = "account/events/"
  end
  
  def print_action
    puts "<<<<<<<<<<<<<<<<<<<<#{controller_name}-#{action_name}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  end  
  
  def event_params
    params.require(:event).permit(:name, :description, :start_time, :template_id)
  end
  
end
