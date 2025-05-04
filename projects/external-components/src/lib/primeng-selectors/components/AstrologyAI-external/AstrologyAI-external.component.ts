import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

@Component({
  selector: 'app-astrology-ai',
  template: `
    <div class="email-app-container">
      <header>
        <h1>Yahoo Email App</h1>
      </header>
      <section class="sidebar">
        <ul>
          <li class="active">Inbox</li>
          <li>Sent</li>
          <li>Drafts</li>
          <li>Spam</li>
        </ul>
      </section>
      <main class="email-list">
        <div class="email-item" *ngFor="let email of emails">
          <div class="sender">{{ email.sender }}</div>
          <div class="subject">{{ email.subject }}</div>
          <div class="snippet">{{ email.snippet }}</div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .email-app-container {
      display: flex;
      flex-direction: row;
      font-family: Arial, sans-serif;
      height: 500px;
      border: 1px solid #d9d9d9;
      background: #f7f8fa;
    }
    header {
      position: absolute;
      width: 100%;
      background: #410093;
      color: #fff;
      padding: 16px;
      text-align: center;
      z-index: 2;
    }
    .sidebar {
      width: 180px;
      background: #efeef4;
      padding-top: 70px;
      border-right: 1px solid #ccc;
      height: 100%;
    }
    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar li {
      padding: 14px 18px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .sidebar li.active, .sidebar li:hover {
      background: #d1c3e6;
      font-weight: bold;
    }
    main.email-list {
      flex: 1;
      overflow-y: auto;
      padding: 80px 24px 24px 24px;
    }
    .email-item {
      background: #fff;
      border-bottom: 1px solid #ececec;
      padding: 12px 10px;
      margin-bottom: 6px;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(65,0,147,0.03);
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.2s;
    }
    .email-item:hover {
      box-shadow: 0 2px 8px rgba(65,0,147,0.08);
    }
    .sender {
      font-weight: 600;
      color: #410093;
    }
    .subject {
      font-size: 15px;
      margin: 2px 0 4px 0;
    }
    .snippet {
      color: #666;
      font-size: 13px;
    }
  `]
})
export class AstrologyAIComponent extends CommonExternalComponent {
  // Features:
  // - Sidebar for Inbox, Sent, Drafts, Spam
  // - Simple mock email list with sender, subject, and snippet
  // - Responsive basic layout

  emails: Array<{ sender: string; subject: string; snippet: string }> = [
    {
      sender: 'Yahoo Team',
      subject: 'Welcome to Yahoo Mail!',
      snippet: 'Get started with your new Yahoo email account...'
    },
    {
      sender: 'John Doe',
      subject: 'Meeting Reminder',
      snippet: 'Don\'t forget about our meeting tomorrow at 10am.'
    },
    {
      sender: 'Newsletters',
      subject: 'Your Daily Digest',
      snippet: 'Here are today\'s top stories just for you.'
    }
  ];
}