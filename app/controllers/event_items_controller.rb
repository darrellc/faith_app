class EventItemsController < ApplicationController
  before_filter :set_view_path, :print_action
  load_and_authorize_resource
  
  #events/items #POST
  def create
    #Take the params
    itemP = event_item_params
    
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js { render(:template => @view_path + "js/create.js.erb",
                         :locals => { 
                                     :i => { :name => itemP[:name], :description => itemP[:description], :duration => params[:duration_min]+":"+params[:duration_sec], :container => params[:container] }, 
                                     :mode => params[:mode], 
                                     :success => true, 
                                     :msg => "The item was successfully added." 
                                    }
                        ) 
                }
    end
    
  end
  
  def print_action
    puts "<<<<<<<<<<<<<<<<<<<<#{controller_name}-#{action_name}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  end  
  
  def event_item_params
    params.require(:event_item).permit(:name, :description, :duration)
  end
  
  def set_view_path
    @view_path = "account/events/items/"
  end
  
end 