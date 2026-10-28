local windowSeconds = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])

if not windowSeconds or windowSeconds < 1 or windowSeconds % 1 ~= 0 then
  return redis.error_reply('windowSeconds precisa ser inteiro positivo')
end

if not limit or limit < 1 or limit % 1 ~= 0 then
  return redis.error_reply('limit precisa ser inteiro positivo')
end

local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('EXPIRE', KEYS[1], windowSeconds)
end

local ttl = redis.call('TTL', KEYS[1])
local decision = 'allowed'
if count > limit then
  decision = 'limited'
end

return { decision, count, ttl }
