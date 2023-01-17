import { createClient } from '@supabase/supabase-js'
import fp from 'fastify-plugin'

import type { SupabaseClient } from '@supabase/supabase-js'
import type { FastifyPluginAsync } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient
  }
}

const supabasePlugin: FastifyPluginAsync = async fastify => {
  fastify.decorate('supabase', createClient(fastify.config.SUPABASE_URL, fastify.config.SUPABASE_API_SECRET))
}

export default fp(supabasePlugin)
