class User < ApplicationRecord
    validates :email, :username, :password_digest, :session_token, presence: true
    validates :email, :username, :session_token, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }

    has_one_attached :photo

    has_many :memberships,
        class_name: :Membership,
        foreign_key: :member_id

    has_many :friend_reqs, 
        as: :membershipable,
        class_name: :Membership

    has_many :servers,
        through: :memberships,
        source: :membershipable,
        source_type: :Server
    
    has_many :servers_owned,
        class_name: :Server,
        foreign_key: :owner_id

    has_many :channels,
        through: :memberships,
        source: :membershipable,
        source_type: :Channel

    has_many :direct_messages,
        through: :memberships,
        source: :membershipable,
        source_type: :DirectMessage

    has_many :friend_backs,
        through: :memberships,
        source: :membershipable,
        source_type: :User

    has_many :messages, 
        class_name: :Message,
        foreign_key: :author_id

    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def reset_session_token!
        self.update!(session_token: self.class.generate_session_token)
        self.session_token
    end

    def friends
      @friends ||= self.friend_back_ids + self.friend_req_ids
    end

end
