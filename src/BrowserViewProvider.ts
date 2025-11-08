import type { Event, TreeDataProvider, TreeItem } from 'vscode'
import { EventEmitter, ThemeIcon, TreeItemCollapsibleState } from 'vscode'

export class BrowserViewProvider implements TreeDataProvider<BrowserViewItem> {
  private _onDidChangeTreeData: EventEmitter<BrowserViewItem | undefined | null | void> = new EventEmitter<BrowserViewItem | undefined | null | void>()
  readonly onDidChangeTreeData: Event<BrowserViewItem | undefined | null | void> = this._onDidChangeTreeData.event

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }

  getTreeItem(element: BrowserViewItem): TreeItem {
    return element
  }

  getChildren(element?: BrowserViewItem): Thenable<BrowserViewItem[]> {
    if (element) {
      return Promise.resolve([])
    }
    else {
      return Promise.resolve([
        new BrowserViewItem(
          'Open Browser',
          'browse-lite.open',
          new ThemeIcon('globe'),
        ),
        new BrowserViewItem(
          'Open Active File',
          'browse-lite.openActiveFile',
          new ThemeIcon('file-code'),
        ),
      ])
    }
  }
}

export class BrowserViewItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly command: string,
    public readonly icon: ThemeIcon,
  ) {
    super(label, TreeItemCollapsibleState.None)
    this.iconPath = icon
    this.command = {
      command,
      title: label,
    }
  }
}
