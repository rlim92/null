json.set! channel.id do
    json.extract! channel, :id, :name, :description
    json.serverId channel.server_id
    json.isPrivate channel.is_private
    json.isVoice channel.is_voice
    json.messageIds channel.message_ids
    json.memberIds channel.member_ids
end