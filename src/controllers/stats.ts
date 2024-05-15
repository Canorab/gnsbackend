import {
  GetUserType,
  UserDeleteType,
  UserType,
  UserUpdateType,
} from "@/config/schema.zod";
import { NextFunction, Request, RequestHandler, Response } from "express";

import DomainModel from "@/models/domain";
import UserModel from "@/models/user";

// Get Admin Stats

export const getStatsForAdmin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // Get All Users Count
  const allUsersCount = await UserModel.aggregate().count("totalUsers");

  // Get all Today Users  Count
  const todayUsersCount = await UserModel.aggregate([
    {
      $match: {
        $expr: {
          $lt: [
            {
              $dateDiff: {
                startDate: "$_id",
                endDate: "$$NOW",
                unit: "hour",
              },
            },
            24,
          ],
        },
      },
    },
  ]).count("todayUsers");

  // Get all Domains Count
  const allDomainsCount = await DomainModel.aggregate().count("totalDomains");
  // Get all Today Domains Count
  const todayDomainsCount = await DomainModel.aggregate([
    {
      $match: {
        $expr: {
          $lt: [
            {
              $dateDiff: {
                startDate: "$_id",
                endDate: "$$NOW",
                unit: "hour",
              },
            },
            24,
          ],
        },
      },
    },
  ]).count("todayDomains");

  res.json([
    {
      totalusers: allUsersCount.length ? allUsersCount[0].totalUsers : 0,
      todayUsers: todayUsersCount.length ? todayUsersCount[0].todayUsers : 0,
      totalDomains: allDomainsCount.length
        ? allDomainsCount[0].totalDomains
        : 0,
      todayDomains: todayDomainsCount.length
        ? todayDomainsCount[0].todayDomains
        : 0,
    },
  ]);
};

// Get stats for  user
export const getStatsForUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  // Get User's Referrals Count
  const userReferralscount = await UserModel.aggregate([
    {
      $match: { referrerUsername: `${username}` },
    },
  ]).count("totalUsers");

  // Get User's Today Referrals Count

  const todayUserReferralscount = await UserModel.aggregate([
    {
      $match: { referrerUsername: `${username}` },
    },
    {
      $match: {
        $expr: {
          $lt: [
            {
              $dateDiff: {
                startDate: "$_id",
                endDate: "$$NOW",
                unit: "hour",
              },
            },
            24,
          ],
        },
      },
    },
  ]).count("todayUsers");

  // Get User's Referrals Domains Count
  const userReferralsDomainsCount = await UserModel.aggregate([
    { $match: { referrerUsername: `${username}` } },
    {
      $lookup: {
        from: "domains",
        localField: "username",
        foreignField: "username",
        as: "user_domains",
      },
    },
    {
      $unwind: "$user_domains",
    },
    // {
    //   $group: {
    //     _id: null,
    //     total: { $sum: 1 },
    //   },
    // },
  ]).count("totalDomains");

  // Get User's Today Domains Count
  const todayUserReferralsDomains = await DomainModel.aggregate([
    { $match: { referrerUsername: `${username}` } },
    {
      $lookup: {
        from: "domains",
        localField: "username",
        foreignField: "username",
        as: "user_domains",
      },
    },
    {
      $match: {
        $expr: {
          $lt: [
            {
              $dateDiff: {
                startDate: "$_id",
                endDate: "$$NOW",
                unit: "hour",
              },
            },
            24,
          ],
        },
      },
    },
    {
      $unwind: "$user_domains",
    },
  ]).count("todayDomains");

  res.json([
    {
      totalusers: userReferralscount.length
        ? userReferralscount[0].totalUsers
        : 0,
      todayUsers: todayUserReferralscount.length
        ? todayUserReferralscount[0].todayUsers
        : 0,
      totalDomains: userReferralsDomainsCount.length
        ? userReferralsDomainsCount[0].totalDomains
        : 0,
      todayDomains: todayUserReferralsDomains.length
        ? todayUserReferralsDomains[0].todayDomains
        : 0,
    },
  ]);
};
