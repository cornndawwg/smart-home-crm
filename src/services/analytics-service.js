const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AnalyticsService {
  constructor() {
    this.initService();
  }

  async initService() {
    console.log('🔬 Analytics Service: Initializing for real-time KPI tracking...');
  }

  // =============================================================================
  // EXECUTIVE SUMMARY DASHBOARD API
  // =============================================================================

  /**
   * Get real-time executive summary for dashboard
   * Returns 4-quadrant KPI data: Revenue Impact, Efficiency Gains, Customer Experience, AI Performance
   */
  async getExecutiveSummary(timeframe = 'last_30_days') {
    try {
      const dateRange = this.getDateRange(timeframe);
      
      // Parallel execution for performance
      const [
        revenueImpact,
        efficiencyGains,
        customerExperience,
        aiPerformance,
        roiCalculation
      ] = await Promise.all([
        this.calculateRevenueImpact(dateRange),
        this.calculateEfficiencyGains(dateRange),
        this.calculateCustomerExperience(dateRange),
        this.calculateAIPerformance(dateRange),
        this.calculateROI(dateRange)
      ]);

      return {
        success: true,
        data: {
          timeframe,
          lastUpdated: new Date().toISOString(),
          revenueImpact,
          efficiencyGains,
          customerExperience,
          aiPerformance,
          roiCalculation,
          status: 'operational',
          alerts: await this.checkKPIAlerts({
            revenueImpact,
            efficiencyGains,
            customerExperience,
            aiPerformance
          })
        }
      };
    } catch (error) {
      console.error('❌ Executive Summary Error:', error);
      return {
        success: false,
        error: 'Failed to generate executive summary',
        details: error.message
      };
    }
  }

  // =============================================================================
  // REVENUE IMPACT CALCULATIONS
  // =============================================================================

  async calculateRevenueImpact(dateRange) {
    try {
      // Get baseline metrics from before AI implementation
      const baselineRevenue = await this.getBaselineRevenue();
      
      // Current revenue metrics
      const currentRevenue = await prisma.proposal.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          status: { in: ['approved', 'completed'] }
        },
        _sum: { totalAmount: true },
        _count: true
      });

      // AI-attributed revenue (proposals generated via AI)
      const aiAttributedRevenue = await prisma.proposal.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          status: { in: ['approved', 'completed'] },
          customerPersona: { not: null }, // AI-generated proposals have persona
          voiceTranscript: { not: null }   // Voice AI integration
        },
        _sum: { totalAmount: true },
        _count: true
      });

      // Conversion rate calculation
      const totalProposals = await prisma.proposal.count({
        where: { createdAt: { gte: dateRange.start, lte: dateRange.end } }
      });

      const conversionRate = totalProposals > 0 ? 
        (currentRevenue._count / totalProposals) * 100 : 0;

      // Calculate improvements vs baseline
      const revenueImprovement = baselineRevenue > 0 ? 
        ((currentRevenue._sum.totalAmount || 0) - baselineRevenue) / baselineRevenue * 100 : 0;

      const averageDealSize = currentRevenue._count > 0 ? 
        (currentRevenue._sum.totalAmount || 0) / currentRevenue._count : 0;

      const baselineAverageDeal = 4500; // Historical average - should be configurable
      const dealSizeImprovement = baselineAverageDeal > 0 ? 
        (averageDealSize - baselineAverageDeal) / baselineAverageDeal * 100 : 0;

      return {
        totalRevenue: currentRevenue._sum.totalAmount || 0,
        aiAttributedRevenue: aiAttributedRevenue._sum.totalAmount || 0,
        revenueImprovement: Math.round(revenueImprovement * 10) / 10,
        conversionRate: Math.round(conversionRate * 10) / 10,
        averageDealSize: Math.round(averageDealSize),
        dealSizeImprovement: Math.round(dealSizeImprovement * 10) / 10,
        totalDeals: currentRevenue._count,
        aiGeneratedDeals: aiAttributedRevenue._count,
        status: revenueImprovement >= 25 ? 'exceeding_target' : 
                revenueImprovement >= 20 ? 'on_target' : 'below_target'
      };
    } catch (error) {
      console.error('❌ Revenue Impact Calculation Error:', error);
      return this.getDefaultRevenueMetrics();
    }
  }

  // =============================================================================
  // EFFICIENCY GAINS CALCULATIONS
  // =============================================================================

  async calculateEfficiencyGains(dateRange) {
    try {
      // Proposal generation metrics
      const proposalMetrics = await prisma.proposalMetrics.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end }
        },
        _avg: { generationTime: true, aiProcessingTime: true },
        _count: true
      });

      // Voice processing performance - FIXED: using transcriptionStatus instead of processingStatus
      const voiceRecordings = await prisma.voiceRecording.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          transcriptionStatus: 'completed'
        },
        _avg: { processingDurationMs: true },
        _count: true
      });

      // Calculate time savings
      const traditionalProposalTime = 2.5; // hours per proposal (baseline)
      const currentProposalTime = (proposalMetrics._avg.generationTime || 0) / 3600; // convert seconds to hours
      const timeSavingPercentage = traditionalProposalTime > 0 ? 
        ((traditionalProposalTime - currentProposalTime) / traditionalProposalTime) * 100 : 0;

      const totalTimeSaved = (proposalMetrics._count || 0) * (traditionalProposalTime - currentProposalTime);
      
      // Technician productivity
      const technicianProductivity = proposalMetrics._count > 0 ? 
        (proposalMetrics._count / this.getWorkingDaysInRange(dateRange)) : 0;

      // Voice processing speed
      const avgVoiceProcessingSpeed = voiceRecordings._avg.processingDurationMs ? 
        voiceRecordings._avg.processingDurationMs / 1000 : 0; // convert to seconds

      return {
        proposalsGenerated: proposalMetrics._count || 0,
        avgProposalTime: Math.round(currentProposalTime * 3600), // back to seconds for display
        timeSavingPercentage: Math.round(timeSavingPercentage * 10) / 10,
        totalTimeSavedHours: Math.round(totalTimeSaved * 10) / 10,
        technicianProductivity: Math.round(technicianProductivity * 10) / 10,
        voiceProcessingSpeed: Math.round(avgVoiceProcessingSpeed * 10) / 10,
        costSavings: Math.round(totalTimeSaved * 50), // $50/hour technician cost
        status: timeSavingPercentage >= 90 ? 'exceeding_target' : 
                timeSavingPercentage >= 85 ? 'on_target' : 'below_target'
      };
    } catch (error) {
      console.error('❌ Efficiency Gains Calculation Error:', error);
      return this.getDefaultEfficiencyMetrics();
    }
  }

  // =============================================================================
  // CUSTOMER EXPERIENCE CALCULATIONS
  // =============================================================================

  async calculateCustomerExperience(dateRange) {
    try {
      // Customer interaction tracking
      const interactions = await prisma.customerInteractionTracking.findMany({
        where: {
          timestamp: { gte: dateRange.start, lte: dateRange.end }
        }
      });

      // Proposal response metrics
      const proposalResponses = await prisma.proposalMetrics.findMany({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          status: { in: ['viewed', 'responded', 'accepted'] }
        }
      });

      // Calculate satisfaction scores
      const satisfactionScores = interactions
        .filter(i => i.satisfaction !== null)
        .map(i => i.satisfaction);
      
      const avgSatisfaction = satisfactionScores.length > 0 ? 
        satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length : 0;

      // Response rate calculation
      const totalProposalsSent = await prisma.proposalMetrics.count({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          sentAt: { not: null }
        }
      });

      const responseRate = totalProposalsSent > 0 ? 
        (proposalResponses.length / totalProposalsSent) * 100 : 0;

      // Calculate baseline improvement
      const baselineResponseRate = 35; // Historical baseline
      const responseRateImprovement = baselineResponseRate > 0 ? 
        ((responseRate - baselineResponseRate) / baselineResponseRate) * 100 : 0;

      // Engagement metrics
      const avgViewDuration = proposalResponses
        .filter(p => p.viewDuration !== null)
        .reduce((acc, p, _, arr) => acc + (p.viewDuration || 0) / arr.length, 0);

      return {
        customerSatisfaction: Math.round(avgSatisfaction * 10) / 10,
        responseRate: Math.round(responseRate * 10) / 10,
        responseRateImprovement: Math.round(responseRateImprovement * 10) / 10,
        avgViewDuration: Math.round(avgViewDuration * 10) / 10,
        totalInteractions: interactions.length,
        positiveInteractions: interactions.filter(i => i.outcome === 'positive').length,
        engagementScore: Math.round((responseRate + avgSatisfaction * 10) / 2 * 10) / 10,
        status: avgSatisfaction >= 8.5 ? 'exceeding_target' : 
                avgSatisfaction >= 8.0 ? 'on_target' : 'below_target'
      };
    } catch (error) {
      console.error('❌ Customer Experience Calculation Error:', error);
      return this.getDefaultCustomerMetrics();
    }
  }

  // =============================================================================
  // AI PERFORMANCE CALCULATIONS
  // =============================================================================

  async calculateAIPerformance(dateRange) {
    try {
      // Persona detection accuracy from analytics events
      const personaEvents = await prisma.analyticsEvent.findMany({
        where: {
          timestamp: { gte: dateRange.start, lte: dateRange.end },
          eventType: 'persona_detection',
          accuracy: { not: null }
        }
      });

      const avgPersonaAccuracy = personaEvents.length > 0 ? 
        personaEvents.reduce((acc, e) => acc + (e.accuracy || 0), 0) / personaEvents.length * 100 : 0;

      // Product recommendation performance
      const recommendationEvents = await prisma.analyticsEvent.findMany({
        where: {
          timestamp: { gte: dateRange.start, lte: dateRange.end },
          eventType: 'product_recommendation',
          success: true
        }
      });

      // Voice processing metrics - FIXED: using transcriptionStatus instead of processingStatus
      const voiceProcessingMetrics = await prisma.voiceRecording.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          transcriptionStatus: 'completed'
        },
        _avg: { processingDurationMs: true },
        _count: true
      });

      const avgVoiceProcessingTime = voiceProcessingMetrics._avg.processingDurationMs ? 
        voiceProcessingMetrics._avg.processingDurationMs / 1000 : 0;

      // System uptime calculation (simplified)
      const totalEvents = await prisma.analyticsEvent.count({
        where: { timestamp: { gte: dateRange.start, lte: dateRange.end } }
      });
      
      const failedEvents = await prisma.analyticsEvent.count({
        where: { 
          timestamp: { gte: dateRange.start, lte: dateRange.end },
          success: false 
        }
      });

      const systemUptime = totalEvents > 0 ? 
        ((totalEvents - failedEvents) / totalEvents) * 100 : 100;

      // Recommendation acceptance rate
      const recommendationAcceptance = await this.calculateRecommendationAcceptance(dateRange);

      return {
        personaAccuracy: Math.round(avgPersonaAccuracy * 10) / 10,
        recommendationAccuracy: Math.round(recommendationAcceptance * 10) / 10,
        voiceProcessingSpeed: Math.round(avgVoiceProcessingTime * 10) / 10,
        systemUptime: Math.round(systemUptime * 10) / 10,
        totalProcessedRequests: totalEvents,
        successfulRequests: totalEvents - failedEvents,
        errorRate: totalEvents > 0 ? Math.round((failedEvents / totalEvents) * 100 * 10) / 10 : 0,
        status: avgPersonaAccuracy >= 97 ? 'exceeding_target' : 
                avgPersonaAccuracy >= 95 ? 'on_target' : 'below_target'
      };
    } catch (error) {
      console.error('❌ AI Performance Calculation Error:', error);
      return this.getDefaultAIMetrics();
    }
  }

  // =============================================================================
  // ROI CALCULATION
  // =============================================================================

  async calculateROI(dateRange) {
    try {
      const [revenueImpact, efficiencyGains] = await Promise.all([
        this.calculateRevenueImpact(dateRange),
        this.calculateEfficiencyGains(dateRange)
      ]);

      // AI implementation costs (should be configurable)
      const aiImplementationCosts = 15000; // monthly cost
      const monthsInRange = this.getMonthsInRange(dateRange);
      const totalCosts = aiImplementationCosts * monthsInRange;

      // Benefits calculation
      const revenueBenefit = revenueImpact.aiAttributedRevenue || 0;
      const costSavingsBenefit = efficiencyGains.costSavings || 0;
      const totalBenefits = revenueBenefit + costSavingsBenefit;

      // ROI calculation
      const netBenefit = totalBenefits - totalCosts;
      const roiPercentage = totalCosts > 0 ? (netBenefit / totalCosts) * 100 : 0;
      const paybackPeriodDays = revenueBenefit > 0 ? (totalCosts / (revenueBenefit / 30)) : null;

      return {
        totalBenefits: Math.round(totalBenefits),
        totalCosts: Math.round(totalCosts),
        netBenefit: Math.round(netBenefit),
        roiPercentage: Math.round(roiPercentage * 10) / 10,
        paybackPeriodDays: paybackPeriodDays ? Math.round(paybackPeriodDays) : null,
        revenueBenefit: Math.round(revenueBenefit),
        costSavingsBenefit: Math.round(costSavingsBenefit),
        status: roiPercentage >= 400 ? 'exceeding_target' : 
                roiPercentage >= 300 ? 'on_target' : 'below_target'
      };
    } catch (error) {
      console.error('❌ ROI Calculation Error:', error);
      return this.getDefaultROIMetrics();
    }
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  getDateRange(timeframe) {
    const now = new Date();
    let start;

    switch (timeframe) {
      case 'last_7_days':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last_30_days':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'last_90_days':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return { start, end: now };
  }

  getWorkingDaysInRange(dateRange) {
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysDiff = Math.ceil((dateRange.end - dateRange.start) / msPerDay);
    return Math.max(1, Math.round(daysDiff * 0.71)); // Approx 5/7 for working days
  }

  getMonthsInRange(dateRange) {
    const msPerMonth = 30 * 24 * 60 * 60 * 1000;
    return Math.max(1, Math.round((dateRange.end - dateRange.start) / msPerMonth));
  }

  async getBaselineRevenue() {
    // This should be a configurable baseline from before AI implementation
    return 125000; // Example baseline for 30 days
  }

  async calculateRecommendationAcceptance(dateRange) {
    try {
      const recommendationEvents = await prisma.analyticsEvent.count({
        where: {
          timestamp: { gte: dateRange.start, lte: dateRange.end },
          eventType: 'product_recommendation'
        }
      });

      const acceptedRecommendations = await prisma.analyticsEvent.count({
        where: {
          timestamp: { gte: dateRange.start, lte: dateRange.end },
          eventType: 'product_recommendation',
          data: { path: ['accepted'], equals: true }
        }
      });

      return recommendationEvents > 0 ? (acceptedRecommendations / recommendationEvents) * 100 : 0;
    } catch (error) {
      console.error('❌ Recommendation Acceptance Calculation Error:', error);
      return 0;
    }
  }

  async checkKPIAlerts(metrics) {
    const alerts = [];

    // Revenue alerts
    if (metrics.revenueImpact.status === 'below_target') {
      alerts.push({
        type: 'warning',
        category: 'revenue',
        message: 'Revenue improvement below target (20%)',
        value: metrics.revenueImpact.revenueImprovement
      });
    }

    // Efficiency alerts
    if (metrics.efficiencyGains.status === 'below_target') {
      alerts.push({
        type: 'warning',
        category: 'efficiency',
        message: 'Time savings below target (85%)',
        value: metrics.efficiencyGains.timeSavingPercentage
      });
    }

    // AI Performance alerts
    if (metrics.aiPerformance.errorRate > 5) {
      alerts.push({
        type: 'critical',
        category: 'ai_performance',
        message: 'AI error rate exceeds 5%',
        value: metrics.aiPerformance.errorRate
      });
    }

    return alerts;
  }

  // Default metrics for error handling
  getDefaultRevenueMetrics() {
    return {
      totalRevenue: 0,
      aiAttributedRevenue: 0,
      revenueImprovement: 0,
      conversionRate: 0,
      averageDealSize: 0,
      dealSizeImprovement: 0,
      totalDeals: 0,
      aiGeneratedDeals: 0,
      status: 'unknown'
    };
  }

  getDefaultEfficiencyMetrics() {
    return {
      proposalsGenerated: 0,
      avgProposalTime: 0,
      timeSavingPercentage: 0,
      totalTimeSavedHours: 0,
      technicianProductivity: 0,
      voiceProcessingSpeed: 0,
      costSavings: 0,
      status: 'unknown'
    };
  }

  getDefaultCustomerMetrics() {
    return {
      customerSatisfaction: 0,
      responseRate: 0,
      responseRateImprovement: 0,
      avgViewDuration: 0,
      totalInteractions: 0,
      positiveInteractions: 0,
      engagementScore: 0,
      status: 'unknown'
    };
  }

  getDefaultAIMetrics() {
    return {
      personaAccuracy: 0,
      recommendationAccuracy: 0,
      voiceProcessingSpeed: 0,
      systemUptime: 0,
      totalProcessedRequests: 0,
      successfulRequests: 0,
      errorRate: 0,
      status: 'unknown'
    };
  }

  getDefaultROIMetrics() {
    return {
      totalBenefits: 0,
      totalCosts: 0,
      netBenefit: 0,
      roiPercentage: 0,
      paybackPeriodDays: null,
      revenueBenefit: 0,
      costSavingsBenefit: 0,
      status: 'unknown'
    };
  }

  // Event tracking for analytics
  async trackEvent(eventData) {
    try {
      return await prisma.analyticsEvent.create({
        data: {
          eventType: eventData.eventType,
          eventCategory: eventData.eventCategory,
          userId: eventData.userId,
          customerId: eventData.customerId,
          proposalId: eventData.proposalId,
          data: eventData.data || {},
          metadata: eventData.metadata || {},
          processingTime: eventData.processingTime,
          accuracy: eventData.accuracy,
          confidence: eventData.confidence,
          success: eventData.success ?? true,
          errorMessage: eventData.errorMessage,
          revenueImpact: eventData.revenueImpact,
          costSavings: eventData.costSavings
        }
      });
    } catch (error) {
      console.error('❌ Event Tracking Error:', error);
      return null;
    }
  }
}

module.exports = AnalyticsService; 