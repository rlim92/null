json.currentUser do 
    json.partial! "api/users/user", user: @user
    json.extract! @user, :id, :username
    json.serverIds @user.server_ids 
    json.channelIds @user.channel_ids
    json.dmIds @user.direct_message_ids
    json.friendIds @user.friends
end

json.servers do
    @user.servers.each do |server|
        json.set! server.id do 
            json.extract! server, :name, :description
            json.isPublic server.is_public
            json.ownerId server.owner_id
        end
    end
end

non_friends = []

json.directMessages do
    @user.direct_messages.where(is_group: false).each do |dm|
        json.set! dm.id do
            other_id = dm.members.where.not(username: 'rich')[0].id
            json.member_id other_id
        end
    end
    @user.direct_messages.where(is_group: true).each do |dm|
        json.set! dm.id do
            other_ids = dm.members.where.not(username: 'rich').pluck('id')
            other_ids.each do |other|
                non_friends << other unless @user.friends.include?(other)
            end
            json.member_ids dm.members.where.not(username: 'rich').pluck('id')
        end
    end
end

json.friends do
    User.find(@user.friends).each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
            json.isFriend true
        end
    end
    User.where(id: non_friends).each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
            json.isFriend false
        end
    end
end