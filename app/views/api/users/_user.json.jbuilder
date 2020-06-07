json.extract! user, :id, :username
json.avatarUrl user.avatar.attached? ? url_for(@user.avatar) : ""