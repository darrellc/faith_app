class Ability
  include CanCan::Ability
  
  def initialize(user)
    puts user.role
    case user.role
    #Admin
    when 1
      can :manage, :all
    #Editor
    when 2
      can :read, :all
      can :edit, :all
      can :create, [:Event, :Member, :MemberGroup]
      can :destroy, :all, :user_id => user.id      
    #Viewer
    when 3  
      can :read, :all
    end
        
  end
  
end