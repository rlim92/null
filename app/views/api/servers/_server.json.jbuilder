json.set! server.id do 
    json.extract! server, :id, :name, :description
    json.isPublic server.is_public
    json.imOwner do 
        server.owner_id == current_user.id
    end
    json.channelIds server.channel_ids
end