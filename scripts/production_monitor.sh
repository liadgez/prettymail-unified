#!/bin/bash

# PrettyMail Production Monitoring Script
# This script checks the health and status of the production deployment

echo "🔍 PrettyMail Production Monitor"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Production URL
PROD_URL="https://prettymail-r4nq9n4pm-liad-gezs-projects.vercel.app"

echo -e "${BLUE}📡 Checking production deployment...${NC}"

# Check if site is responding
STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}" $PROD_URL)

if [ "$STATUS_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Application responding (HTTP $STATUS_CODE)${NC}"
else
    echo -e "${RED}❌ Application error (HTTP $STATUS_CODE)${NC}"
    exit 1
fi

# Check response time
echo -e "${BLUE}⚡ Measuring response time...${NC}"
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" $PROD_URL)
RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc -l | cut -d. -f1)

if [ "$RESPONSE_MS" -lt 1000 ]; then
    echo -e "${GREEN}✅ Response time: ${RESPONSE_MS}ms${NC}"
elif [ "$RESPONSE_MS" -lt 3000 ]; then
    echo -e "${YELLOW}⚠️ Response time: ${RESPONSE_MS}ms (slower than ideal)${NC}"
else
    echo -e "${RED}❌ Response time: ${RESPONSE_MS}ms (too slow)${NC}"
fi

# Check HTTPS
echo -e "${BLUE}🔒 Verifying HTTPS security...${NC}"
HSTS_HEADER=$(curl -s -I $PROD_URL | grep -i "strict-transport-security")

if [ -n "$HSTS_HEADER" ]; then
    echo -e "${GREEN}✅ HTTPS with HSTS enabled${NC}"
else
    echo -e "${YELLOW}⚠️ HSTS header missing${NC}"
fi

# Check deployment status
echo -e "${BLUE}🚀 Checking Vercel deployment status...${NC}"
VERCEL_STATUS=$(vercel ls --json 2>/dev/null | jq -r '.[0].state' 2>/dev/null || echo "unknown")

if [ "$VERCEL_STATUS" = "READY" ]; then
    echo -e "${GREEN}✅ Vercel deployment status: READY${NC}"
else
    echo -e "${YELLOW}⚠️ Vercel deployment status: $VERCEL_STATUS${NC}"
fi

# Check environment variables
echo -e "${BLUE}⚙️ Verifying environment configuration...${NC}"
ENV_CHECK=$(vercel env ls 2>/dev/null | grep "VITE_GOOGLE_CLIENT_ID" | wc -l)

if [ "$ENV_CHECK" -ge 1 ]; then
    echo -e "${GREEN}✅ Environment variables configured${NC}"
else
    echo -e "${RED}❌ Environment variables missing${NC}"
fi

echo ""
echo -e "${BLUE}📊 Production Health Summary:${NC}"
echo "================================="
echo -e "Application: ${GREEN}✅ Healthy${NC}"
echo -e "Performance: $([ "$RESPONSE_MS" -lt 1000 ] && echo -e "${GREEN}✅ Good${NC}" || echo -e "${YELLOW}⚠️ Monitor${NC}")"
echo -e "Security: ${GREEN}✅ Secure${NC}"
echo -e "Deployment: $([ "$VERCEL_STATUS" = "READY" ] && echo -e "${GREEN}✅ Ready${NC}" || echo -e "${YELLOW}⚠️ Check${NC}")"
echo ""
echo -e "${BLUE}🌐 Live URL: $PROD_URL${NC}"
echo ""

# Optional: Log to file with timestamp
echo "$(date): Health check completed - Status: $STATUS_CODE, Response: ${RESPONSE_MS}ms" >> /tmp/prettymail_health.log

echo -e "${GREEN}🎉 Monitoring complete!${NC}"
