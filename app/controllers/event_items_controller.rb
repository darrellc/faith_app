class EventItemsController < ApplicationController
  before_filter :set_view_path, :print_action
    
  #events/items #POST
  def create
    #Take the params
    itemP = event_item_params
    data_id = nil
    #The event is already in the database and is being viewed
    #The current_user is trying to add more items to the event.
    if params[:container].include? "#itemShowBox"
      event = Event.find params[:event_id]
      puts event.inspect
      item = EventItem.create name: itemP[:name], description: itemP[:description], duration: params[:duration_min]+":"+params[:duration_sec]
      authorize! :create, item
      item.event = event
      item.save
      data_id = "data-id='#{item.id}'"      
    end    
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js { render(:template => @template,
                         :locals => { 
                                     :i => { 
                                       :name => itemP[:name], 
                                       :description => itemP[:description], 
                                       :duration => params[:duration_min]+":"+params[:duration_sec], 
                                       :container => params[:container], 
                                       :song_id => params[:song_id],
                                       :member_group_id => params[:member_group_id] 
                                     },
                                     :data_id => data_id, 
                                     :mode => params[:mode], 
                                     :success => true, 
                                     :msg => "The item was successfully added." 
                                    }
                        ) 
                }
    end
    
  end
  
  def destroy
    #Delete event item    
    begin
      eventItem = EventItem.find params[:id] 
      eventItem.destroy
      respond_to do |format|
        format.js{ render :template => @template, :locals => {:id => params[:id] } }
      end  
    rescue 
      respond_to do |format|
        format.js{ render :template => @template, :locals => {:id => params[:id] } }
      end
    end
    
  end
  #Get the information either from the database or from the 
  def get    
    begin
      item = EventItem.find params["data-id"]      
      puts item      
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js {render :template => @template, :locals => {:i => item, :song => item.song} }
      end
    #Record was not found...must find it on the document - it is an Eventitem that has not yet been added.
    rescue
      song = nil
      if params[:song] != ""
        #find the song with the song id passed in from the user
        song = Song.find(params[:song])
      end
      respond_to do |format|        
        format.html {redirect_to root_path}
        format.js {render :template => @template, :locals => {:id => params["data-id"], :i => nil, :song => song } }
      end
    end
        
  end
  
  def print_action
    puts "<<<<<<<<<<<<<<<<<<<<#{controller_name}-#{action_name}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    @template = "#{@view_path}js/#{action_name}.js.erb"
  end  
  
  def event_item_params
    params.require(:event_item).permit(:name, :description, :duration)
  end
  
  def set_view_path
    @view_path = "account/events/items/"
  end
  
end 