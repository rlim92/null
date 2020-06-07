class ChannelChat < ApplicationCable::Channel

  def subscribed
    @chat_channel = Channel.find(params[:id])

    stream_for @chat_channel
  end

  def speak(data)
    message = @chat_channel.messages.new(text: data['message'])
    message.author_id = current_user.id

    if message.save
      msg = {}
      msg[message.id] = { 
        id: message.id, 
        text: message.text,
        authorId: message.author_id,
        createdAt: message.created_at
      }
      socket = { message: msg.to_json, type: 'message' }
      ChannelChat.broadcast_to(@chat_channel, socket)
    end
  end

  def unsubscribed
  end

end