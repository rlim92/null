# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Server.destroy_all
Channel.destroy_all
DirectMessage.destroy_all
Message.destroy_all
Membership.destroy_all

rich = User.create(email: 'rich@rich.com', username: 'rich', password: 'richrich')

void = User.create!(email: 'dark@dark.com', username: 'Void', password: "blackhole")
flame = User.create!(email: 'red@red.com', username: 'Flame', password: "volcano")
tidal = User.create!(email: 'blue@blue.com', username: 'Tidal', password: "tsunami")
shock = User.create!(email: 'yellow@yellow.com', username: 'Shock', password: "lightning")
cloud = User.create!(email: 'green@green.com', username: 'Cloud', password: "tornado")
rock = User.create(email: "earth@earth.com", username: 'Rock', password: 'avalanche')

dark = Server.create!(name: 'dark', description: 'into the void', owner_id: void.id)
red = Server.create!(name: 'red', description: 'fire', owner_id: flame.id)
blue = Server.create!(name: 'blue', description: 'water', owner_id: tidal.id)
yellow = Server.create!(name: 'yellow', description: 'lightning', owner_id: shock.id)
green = Server.create!(name: 'green', description: 'wind', owner_id: cloud.id)

ch1 = Channel.create!(name: 'animal', description: 'dragon', server_id: dark.id)
ch2 = Channel.create!(name: 'animal', description: 'komodo', server_id: red.id)
ch3 = Channel.create!(name: 'animal', description: 'shark', server_id: blue.id)
ch4 = Channel.create!(name: 'animal', description: 'tiger', server_id: yellow.id)
ch5 = Channel.create!(name: 'animal', description: 'eagle', server_id: green.id)

dm1 = DirectMessage.create!
dm2 = DirectMessage.create!
dm3 = DirectMessage.create!
dm4 = DirectMessage.create!
dm5 = DirectMessage.create!
team_dm = DirectMessage.create!(is_group: true)
edm = DirectMessage.create!

Membership.create!(member_id: rich.id, membershipable_type: "User", membershipable_id: void.id)
Membership.create!(member_id: rich.id, membershipable_type: "User", membershipable_id: flame.id)
Membership.create!(member_id: rich.id, membershipable_type: "User", membershipable_id: tidal.id)
Membership.create!(member_id: rich.id, membershipable_type: "User", membershipable_id: shock.id)
Membership.create!(member_id: rich.id, membershipable_type: "User", membershipable_id: cloud.id)

Membership.create!(member_id: rich.id, membershipable_type: "Server", membershipable_id: dark.id)
Membership.create!(member_id: rich.id, membershipable_type: "Server", membershipable_id: red.id)
Membership.create!(member_id: rich.id, membershipable_type: "Server", membershipable_id: blue.id)
Membership.create!(member_id: rich.id, membershipable_type: "Server", membershipable_id: yellow.id)
Membership.create!(member_id: rich.id, membershipable_type: "Server", membershipable_id: green.id)

Membership.create!(member_id: rock.id, membershipable_type: "Server", membershipable_id: dark.id)
Membership.create!(member_id: rock.id, membershipable_type: "Server", membershipable_id: red.id)
Membership.create!(member_id: rock.id, membershipable_type: "Server", membershipable_id: blue.id)
Membership.create!(member_id: rock.id, membershipable_type: "Server", membershipable_id: yellow.id)
Membership.create!(member_id: rock.id, membershipable_type: "Server", membershipable_id: green.id)

Membership.create!(member_id: void.id, membershipable_type: "Server", membershipable_id: dark.id)
Membership.create!(member_id: flame.id, membershipable_type: "Server", membershipable_id: red.id)
Membership.create!(member_id: tidal.id, membershipable_type: "Server", membershipable_id: blue.id)
Membership.create!(member_id: shock.id, membershipable_type: "Server", membershipable_id: yellow.id)
Membership.create!(member_id: cloud.id, membershipable_type: "Server", membershipable_id: green.id)

Membership.create!(member_id: rich.id, membershipable_type: "Channel", membershipable_id: ch1.id)
Membership.create!(member_id: rich.id, membershipable_type: "Channel", membershipable_id: ch2.id)
Membership.create!(member_id: rich.id, membershipable_type: "Channel", membershipable_id: ch3.id)
Membership.create!(member_id: rich.id, membershipable_type: "Channel", membershipable_id: ch4.id)
Membership.create!(member_id: rich.id, membershipable_type: "Channel", membershipable_id: ch5.id)

Membership.create!(member_id: void.id, membershipable_type: "Channel", membershipable_id: ch1.id)
Membership.create!(member_id: flame.id, membershipable_type: "Channel", membershipable_id: ch2.id)
Membership.create!(member_id: tidal.id, membershipable_type: "Channel", membershipable_id: ch3.id)
Membership.create!(member_id: shock.id, membershipable_type: "Channel", membershipable_id: ch4.id)
Membership.create!(member_id: cloud.id, membershipable_type: "Channel", membershipable_id: ch5.id)

Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: dm1.id)
Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: dm2.id)
Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: dm3.id)
Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: dm4.id)
Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: dm5.id)

Membership.create!(member_id: void.id, membershipable_type: "DirectMessage", membershipable_id: dm1.id)
Membership.create!(member_id: flame.id, membershipable_type: "DirectMessage", membershipable_id: dm2.id)
Membership.create!(member_id: tidal.id, membershipable_type: "DirectMessage", membershipable_id: dm3.id)
Membership.create!(member_id: shock.id, membershipable_type: "DirectMessage", membershipable_id: dm4.id)
Membership.create!(member_id: cloud.id, membershipable_type: "DirectMessage", membershipable_id: dm5.id)

Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)
Membership.create!(member_id: void.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)
Membership.create!(member_id: flame.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)
Membership.create!(member_id: tidal.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)
Membership.create!(member_id: shock.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)
Membership.create!(member_id: cloud.id, membershipable_type: "DirectMessage", membershipable_id: team_dm.id)

Membership.create!(member_id: rich.id, membershipable_type: "DirectMessage", membershipable_id: edm.id)
Membership.create!(member_id: rock.id, membershipable_type: "DirectMessage", membershipable_id: edm.id)

dm1.message.create(text: "Hi!", author_id: void.id)
dm2.message.create(text: "Hey!", author_id: flame.id)
dm3.message.create(text: "Hiya!", author_id: tidal.id)
dm4.message.create(text: "Howdy!", author_id: shock.id)
dm5.message.create(text: "Hello!", author_id: cloud.id)
team_dm.message.create(text: "Greetings!", author_id: rich.id)
edm.message.create(text: "Urg.", author_id: earth.id)