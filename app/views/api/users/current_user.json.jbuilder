json.currentUser do 
    json.partial! "api/users/user", user: @user
    json.extract! @user, :id, :username
    json.serverIds @user.server_ids 
    json.dmIds @user.direct_message_ids
    json.friendIds @user.friends
    json.avatarUrl @user.avatar.attached? ? url_for(@user.avatar) : ""
end

json.servers do
    @user.servers.each do |server|
        json.set! server.id do 
            json.extract! server, :id, :name, :description
            # json.isPublic server.is_public
            # json.ownerId server.owner_id
            json.channelIds server.channel_ids
        end
    end
end

# non_friends = []

# json.directMessages do
#     @user.direct_messages.each do |dm|
#         json.set! dm.id do
#             other_ids = dm.member_ids - [@user.id]
#             other_ids.each do |other|
#                 if !@user.friends.include?(other) && !non_friends.include?(other)
#                     non_friends << other
#                 end
#             end
#             other_ids << @user.id
#             json.id dm.id
#             json.memberIds other_ids
#         end
#     end
# end

# json.friends do
#     User.find(@user.friends).each do |user|
#         json.set! user.id do
#             json.extract! user, :id, :username
#             json.isFriend true
#         end
#     end
#     if (non_friends.length > 0)
#         User.find(non_friends).each do |user|
#             json.set! user.id do
#                 json.extract! user, :id, :username
#                 json.isFriend false
#             end
#         end
#     end
# end