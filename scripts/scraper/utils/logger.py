"""
Structured JSON logger.
All output goes to stderr so Laravel can capture it via Process::ERR.
"""

from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone


class _JSONFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload: dict = {
            "ts":      datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "level":   record.levelname,
            "logger":  record.name,
            "message": record.getMessage(),
        }

        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)

        # Merge extra kwargs (e.g. batch_id, query …) into top-level keys
        _SKIP = {
            "name", "msg", "args", "levelname", "levelno", "pathname",
            "filename", "module", "exc_info", "exc_text", "stack_info",
            "lineno", "funcName", "created", "msecs", "relativeCreated",
            "thread", "threadName", "processName", "process", "message",
            "taskName",
        }
        for key, val in record.__dict__.items():
            if key not in _SKIP:
                payload[key] = val

        return json.dumps(payload, default=str, ensure_ascii=False)


def get_logger(name: str) -> logging.Logger:
    log = logging.getLogger(name)
    if not log.handlers:
        handler = logging.StreamHandler(sys.stderr)
        handler.setFormatter(_JSONFormatter())
        log.addHandler(handler)
        log.setLevel(logging.DEBUG)
        log.propagate = False
    return log
