class DmChat < ApplicationCable::Channel

  def subscribed
    @chat_dm = DirectMessage.find(params[:id])

    stream_for @chat_dm
  end

  def speak(data)
    message = @chat_dm.messages.new(text: data['message'])
    message.author_id = current_user.id

    if message.save!
      msg = {}
      msg[message.id] = { 
        id: message.id, 
        text: message.text,
        authorId: message.author_id,
        createdAt: message.created_at
      }
      socket = { message: msg.to_json, type: 'message' }
      DmChat.broadcast_to(@chat_dm, socket)
    end
  end

  def unsubscribed
  end

end