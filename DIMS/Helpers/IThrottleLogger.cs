﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DIMS.Helpers
{
    /// <summary>
    /// Log requests that exceed the limit
    /// </summary>
    public interface IThrottleLogger
    {
        void Log(ThrottleLogEntry entry);
    }
}